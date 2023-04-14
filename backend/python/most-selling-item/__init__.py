import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, doc:func.DocumentList) -> func.HttpResponse:
    output = ""
    for item in doc:
        output += json.dumps(item) + "\n"
    
    return func.HttpResponse(
        output,
        status_code=200,
        mimetype="text/plain"
    )
# 