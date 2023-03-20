import logging

def main(context: dict, new_offers: list) -> None:
    logging.info('Python HTTP trigger function processed a request.')
    context['bindings']['signalRMessages'] = [{'target': 'newOffer', 'arguments': [offer]} for offer in new_offers]