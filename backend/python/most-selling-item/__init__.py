import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, doc: func.DocumentList) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    logging.info(json.dumps(doc))

    sales_json = []

    for doc_item in doc:
        for item in doc_item:
            sales_json.append({
            "customerName": offer['customerName'],
            "type": offer['type'],
            "price": offer['price'],
            })

    return func.HttpResponse(
        json.dumps(sales_json),
        mimetype="application/json"
    )
