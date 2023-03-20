import logging
import azure.functions as func

def main(new_offers: func.DocumentList):
    if new_offers:
        logging.info('First document Id modified: %s', new_offers[0]['id'])

    # context['bindings']['signalRMessages'] = [{'target': 'newOffer', 'arguments': [offer]} for offer in new_offers]