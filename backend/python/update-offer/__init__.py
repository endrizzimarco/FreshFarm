import logging
import azure.functions as func


def main(documents: func.DocumentList, signalRMessages: func.Out[func.SignalRMessage]):
    if documents:
        logging.info('Document id: %s', documents[0]['id'])
        signalRMessages.set(func.SignalRMessage( target='newOffer', arguments=[documents[0]]))
