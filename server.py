import pandas, csv, sqlite3, json
from flask import Flask, request

##### RUN THIS SERVER BY TYPING IN COMMAND LINE: FLASK_APP=server.py flask run

############################### SET UP APP AND CONNECTIONS ###################################################
# Global set-up flask app
app = Flask(__name__)

# CSV file name
# csvfile = "Los_Angeles_01-21-2019.16_14_43.csv"
csvfile = "USA_01-21-2019.16_15_45.csv"


# Create a database connection using missing_persons data 
df = pandas.read_csv(csvfile)

# (For my reference) Column Names: ['Case Number', 'DLC', 'Last Name', 'First Name', 'Missing Age', 'City', 'County', 'State', 'Sex', 'Race / Ethnicity', 'Date Modified']

############################### FUNCTIONS RETURN DATA FROM MISSING PERSONS DATABASE ###################################################
def select_all_cases():
    """
    Query all rows in the tasks table
    :param conn: the Connection object
    :return:
    """
    conn = sqlite3.connect(":memory:")
    df.to_sql("missing_persons", conn, if_exists='append', index=False)
    cur = conn.cursor()
    cur.execute("SELECT * FROM missing_persons")

    rows = cur.fetchall()

    for row in rows:
        print(row)

    conn.close()
    return return_json(get_columns(), rows)

@app.route('/all-cases')
def select_all_name_age_location():
    """
    Query all rows in the tasks table
    :param conn: the Connection object
    :return:
    """
    conn = sqlite3.connect(":memory:")
    df.to_sql("missing_persons", conn, if_exists='append', index=False)
    cur = conn.cursor()
    result_schema = "\"Case Number\", \"Last Name\", \"First Name\", \"Missing Age\", \"City\", \"State\""
    schema = ["Case Number", "Last Name", "First Name", "Missing Age", "City", "State"]
    statement = "SELECT " + result_schema + " FROM missing_persons"
    cur.execute(statement)

    rows = cur.fetchall()

    for row in rows:
        print(row)

    conn.close()
    return return_json(schema, rows)

@app.route('/case-number')
def select_casenumber():
    """
    Query row that matches case number
    :param conn: the Connection object
    :return:
    """
    conn = sqlite3.connect(":memory:")
    df.to_sql("missing_persons", conn, if_exists='append', index=False)
    case_num = '\"' + request.args.get('casenum') + '\"'
    cur = conn.cursor()
    result_schema = "\"Case Number\", \"DLC\", \"Last Name\", \"First Name\", \"Missing Age\", \"City\", \"County\", \"State\", \"Sex\", \"Race / Ethnicity\", \"Date Modified\""
    schema = ["Case Number", "DLC", "Last Name", "First Name", "Missing Age", "City", "County", "State", "Sex", "Race / Ethnicity", "Date Modified"]
    statement = "SELECT " + result_schema + " FROM missing_persons WHERE \"Case Number\" = " + case_num
    cur.execute(statement)

    rows = cur.fetchall()

    for row in rows:
        print(row)

    conn.close()
    return return_json(schema, rows)

@app.route('/search')
def select_searchstr():
    """
    Query row that contains the user-inputted search string in the user specified column

    :param 
    conn: the Connection object
    col: the column of the table to search
    :return:
    """
    conn = sqlite3.connect(":memory:")
    df.to_sql("missing_persons", conn, if_exists='append', index=False)
    col = request.args.get('col')
    search_str = request.args.get('query')
    cur = conn.cursor()
    result_schema = "\"Case Number\", \"Last Name\", \"First Name\", \"Missing Age\", \"City\", \"State\""
    schema = ["Case Number", "Last Name", "First Name", "Missing Age", "City", "State"]
    if col == "Name":
        # Search for search string in last name, first name
        statement = "SELECT " + result_schema + " FROM missing_persons WHERE instr(\"Last Name\", \"" + search_str + "\") > 0 OR instr(\"First Name\", \"" + search_str + "\") > 0"
    elif col == "Age":
        statement = "SELECT " + result_schema + " FROM missing_persons WHERE instr(\"Missing Age\", \"" + search_str + "\") > 0"
    elif col == "Location":
        statement = "SELECT " + result_schema + " FROM missing_persons WHERE instr(\"City\", \"" + search_str + "\") > 0 OR instr(\"State\", \"" + search_str + "\") > 0"

    print(statement)
    cur.execute(statement)

    rows = cur.fetchall()

    for row in rows:
        print(row)

    conn.close()
    return return_json(schema, rows)

######################################### HELPER FUNCTIONS ###################################################

def get_columns():
    """
    Query all rows in the tasks table
    :param conn: the Connection object
    :return:
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM missing_persons")
    names = [description[0] for description in cur.description]
    print(names)
    return names

def return_json(schema, rows):
    """
    :query: schema is a list of of column names, and rows (or list of tuples) relevant to given query
    :return: JSON object
    """
    # names = get_columns(conn)

    entries = []
    # Match each field in row with columnname as dictionary
    for row in rows:
        row_entry = []
        for i, field in enumerate(row):
            row_entry.append((schema[i], field))
        entries.append(dict(row_entry))

    print(json.dumps(entries))
    return json.dumps(entries)

# def main():
#     # CSV file name
#     # csvfile = "Los_Angeles_01-21-2019.16_14_43.csv"
#     # csvfile = "USA_01-21-2019.16_15_45.csv"

#     # create a database connection
#     # conn = sqlite3.connect(":memory:")
#     # df = pandas.read_csv(csvfile)
#     # df.to_sql("missing_persons", conn, if_exists='append', index=False)

#     with conn:
#         print("Getting column information...")
#         names = get_columns()

#         # print("Querying all cases...")
#         #rows = select_all_cases(conn)

#         print("Querying case that matches case number")
#         # Test specific case for Los Angeles dataset
#         # casenum = "\"MP26951\"" 
#         # Test specific case for USA dataset
#         casenum = "\"MP20931\"" 
#         rows = select_casenumber(casenum)

#         print("Querying case that matches search string ")
#         search_str = "Detr"
#         rows = select_searchstr("Location", search_str)
#         search_str = "arl"
#         rows = select_searchstr("Name", search_str)
#         #search_str = "20"
#         #rows = select_searchstr("Age", search_str)

#         print("Printing last result as JSON")
#         # Need result schema as a list to turn collected rows into JSON properly
#         schema = ["Case Number", "Last Name", "First Name", "Missing Age", "City", "State"]
#         json_msg = return_json(schema, rows)

if __name__ == '__main__':
    # main()
    app.run(debug=False)
