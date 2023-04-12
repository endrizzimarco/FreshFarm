import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, doc: func.DocumentList) -> func.HttpResponse:
    sales_json = []

    for item in doc:
        sales_json.append({
            "type": item["type"],
            "total_price": item["total_price"]
        })

    return func.HttpResponse(
        json.dumps(sales_json),
        mimetype="application/json"
    )
