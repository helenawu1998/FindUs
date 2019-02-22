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

def return_json(conn, rows):
    """
    :query: rows (or list of tuples) relevant to given query
    :return: JSON object
    # TODO: return data as JSON
    """
    names = get_columns(conn)

    entries = []
    # Match each field in row with columnname as dictionary
    for row in rows:
        row_entry = []
        for i, field in enumerate(row):
            row_entry.append((names[i], field))
        entries.append(dict(row_entry))

    print(json.dumps(entries))
    return json.dumps(entries)

def main():
    # database = "C:\\sqlite\db\pythonsqlite.db"
    # CSV file name
    csvfile = "Los_Angeles_01-21-2019.16_14_43.csv"

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

        print("Printing all as JSON")
        json_msg = return_json(conn, rows)


if __name__ == '__main__':
    main()
