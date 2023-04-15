import azure.functions as func
import json

def main(req: func.HttpRequest, doc: func.DocumentList) -> func.HttpResponse:
    # Initialize a dictionary to store the total sales for each type
    sales_by_type = {}

    # Iterate over the document list and sum the prices for each type
    for item in doc:
        item_type = item.get('type')
        item_price = item.get('price', 0)

        if item_type in sales_by_type:
            sales_by_type[item_type]['total_price'] += item_price
        else:
            sales_by_type[item_type] = {'type': item_type, 'total_price': item_price}

    # Convert the dictionary to a list of dictionaries with 'type' and 'total_price' keys
    sales_json = [sales_by_type[k] for k in sales_by_type.keys()]

    # Return the results as a JSON response
    return func.HttpResponse(
        json.dumps(sales_json),
        status_code=200,
        mimetype="application/json"
    )
