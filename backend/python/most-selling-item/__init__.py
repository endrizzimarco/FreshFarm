import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, doc:func.DocumentList) -> func.HttpResponse:
    sales_json = []

    for sale in doc:
        sales_json.append({
            "type": sale['c.type'],
        })

    return func.HttpResponse(
            json.dumps(sales_json),
            status_code=200,
            mimetype="application/json")