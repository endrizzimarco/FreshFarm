import azure.functions as func
import logging


def main(req: func.HttpRequest, connection) -> func.HttpResponse:
    return func.HttpResponse(connection)