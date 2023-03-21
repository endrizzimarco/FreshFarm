import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, conn1, conn2) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps({"added": json.loads(conn1), "deleted" : json.loads(conn2)}),
        status_code=200,
        mimetype="application/json")