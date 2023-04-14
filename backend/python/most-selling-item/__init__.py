import azure.functions as func
import logging


def main(req: func.HttpRequest, doc:func.DocumentList) -> func.HttpResponse:
    output = ""
    for item in doc:
        output += str(item) + "\n"
    
    return func.HttpResponse(
        output,
        status_code=200,
        mimetype="text/plain"
    )
