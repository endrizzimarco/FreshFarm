import logging

import azure.functions as func


def main(documents: func.DocumentList):
    if documents:
        logging.info('Document id: %s', documents[0]['id'])
