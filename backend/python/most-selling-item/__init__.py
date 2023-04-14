import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, doc:func.DocumentList) -> func.HttpResponse:
    sales_json = []
    for offer in doc:
        sales_json.append({
            "type": offer['type'],
        })

    return func.HttpResponse(
            json.dumps(sales_json),
            status_code=200,
            mimetype="application/json")