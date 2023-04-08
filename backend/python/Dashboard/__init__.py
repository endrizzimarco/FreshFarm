# import logging

# import azure.functions as func


# def main(documents: func.DocumentList) -> str:
#     if documents:
#         logging.info('Document id: %s', documents[0]['id'])
import logging
import pyodbc
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Connect to the SQL database
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=servername;DATABASE=databasename;UID=username;PWD=password')
    cursor = conn.cursor()

    # Execute a query to retrieve sales data
    query = 'SELECT * FROM Sales'
    cursor.execute(query)
    sales_data = cursor.fetchall()

    # Format the sales data as needed
    sales_data_formatted = []
    for row in sales_data:
        sale = {
            'id': row[0],
            'date': row[1],
            'product': row[2],
            'quantity': row[3],
            'price': row[4],
            'total': row[5]
        }
        sales_data_formatted.append(sale)

    # Return the formatted sales data as a JSON response
    return func.HttpResponse(sales_data_formatted)
