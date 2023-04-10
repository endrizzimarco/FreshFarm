import logging
import azure.functions as func
import json

def main(req: func.HttpRequest, doc: func.DocumentList) -> func.HttpResponse:
    items = []
    for doc in doc:
        items.append(doc.to_dict())

    # Format the sales data as needed
    sales_data_formatted = []
    for item in items:
        sale = {
            'farmerId': item['farmerId'],
            'customerName': item['customerName'],
            'type': item['type'],
            'collectionTime': item['collectionTime'],
            'price': item['price'],
        }
        sales_data_formatted.append(sale)

    return func.HttpResponse(
            json.dumps(sales_data_formatted),
            status_code=200,
            mimetype="application/json")
