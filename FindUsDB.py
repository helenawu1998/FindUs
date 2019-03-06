import pandas, csv, sqlite3, json

# TODO: filter data and return search results

# con = sqlite3.connect(":memory:")
# cur = con.cursor()
# cur.execute("CREATE TABLE t (casenum, DLC, last_name, first_name, miss_age, city, county, state, sex, race, date_mod);") # use your column names here
# csvfile = "Los_Angeles_01-21-2019.16_14_43.csv"
# with open(datafile,'rb') as fin: # `with` statement available in 2.5+
#     # csv.DictReader uses first line in file for column headings by default
#     dr = csv.DictReader(fin) # comma is default delimiter
#     to_db = [(i['casenum'], i['DLC'], i['last_name'], i['first_name'], i['miss_age'], i['city'], i['county'], i['state'], \
#     	i['sex'], i['race'], i['date_mod']) for i in dr]

# cur.executemany("INSERT INTO t (casenum, DLC, last_name, first_name, miss_age, city, county, state, sex, race, date_mod) VALUES (?, ?);", to_db)
# con.commit()
# con.close()

def select_all_cases(conn):
    """
    Query all rows in the tasks table
    :param conn: the Connection object
    :return:
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM missing_persons")

    rows = cur.fetchall()

    for row in rows:
        print(row)

    return rows

def select_casenumber(conn, case_num):
    """
    Query row that matches case number
    :param conn: the Connection object
    :return:
    """
    cur = conn.cursor()
    result_schema = "\"Case Number\", \"Last Name\", \"First Name\", \"City\", \"State\""
    # statement = "SELECT * FROM missing_persons WHERE \"Case Number\" = " + case_num
    statement = "SELECT " + result_schema + " FROM missing_persons WHERE \"Case Number\" = " + case_num
    cur.execute(statement)

    rows = cur.fetchall()

    for row in rows:
        print(row)

    return rows

def get_columns(conn):
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

def return_json(conn, schema, rows):
    """
    :query: rows (or list of tuples) relevant to given query
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

def main():
    # CSV file name
    # csvfile = "Los_Angeles_01-21-2019.16_14_43.csv"
    csvfile = "USA_01-21-2019.16_15_45.csv"

    # create a database connection
    conn = sqlite3.connect(":memory:")
    df = pandas.read_csv(csvfile)
    df.to_sql("missing_persons", conn, if_exists='append', index=False)
    # conn = create_connection(database)
    with conn:
        print("Getting column information...")
        names = get_columns(conn)

        print("Querying all cases...")
        rows = select_all_cases(conn)

        print("Querying case that matches case number")
        # Test specific case for Los Angeles dataset
        # casenum = "\"MP26951\"" 

        # Test specific case for USA dataset
        casenum = "\"MP20931\"" 
        rows = select_casenumber(conn, casenum)

        print("Printing all as JSON")
        # Need result schema as a list to turn collected rows into JSON properly
        schema = ["Case Number", "Last Name", "First Name", "City", "State"]
        json_msg = return_json(conn, schema, rows)


if __name__ == '__main__':
    main()
