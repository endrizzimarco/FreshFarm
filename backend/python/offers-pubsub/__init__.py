import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, connection) -> func.HttpResponse:
    return func.HttpResponse(
        connection,
        status_code=200,
        mimetype="application/json")