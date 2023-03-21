import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, conn_1, conn_2) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps({"added": json.loads(conn_1), "deleted" : json.loads(conn_2)}),
        status_code=200,
        mimetype="application/json")