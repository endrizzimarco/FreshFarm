import azure.functions as func
import logging


def main(req: func.HttpRequest, doc:func.DocumentList) -> func.HttpResponse:
    query = doc.get('sqlQuery', None)
    if not query:
        return func.HttpResponse("SQL query not found in input binding.", status_code=400)
    
    return func.HttpResponse(query, status_code=200, mimetype="text/plain")
