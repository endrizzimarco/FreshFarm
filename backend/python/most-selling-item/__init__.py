import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, doc: func.DocumentList) -> func.HttpResponse:
    output = []
    for item in doc:
        output.append({
            "type": item['type'],
            # "total_price": item['total_price']
        })
    
    return func.HttpResponse(
        json.dumps(output),
        status_code=200,
        mimetype="application/json"
    )
