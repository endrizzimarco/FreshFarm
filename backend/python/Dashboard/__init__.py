import logging
import azure.functions as func
import json
import time
def main(req: func.HttpRequest, doc: func.DocumentList) -> func.HttpResponse:
    response = {
        "total_month_revenue": 0,
        "average_sale_value": 0,
        "total_sales": len(doc),
        "total_customers": len(set([s.get('customerName') for s in doc])),
        "revenue_by_type":{},
        "revenue_by_customerName":{},
        "this_month_sales": [],
        "uncollected_sales": [],
    }
    for s in doc:
        sale = {
            "id": s.get('id'),
            "farmerId": s.get('farmerId'),
            "title": s.get('title'),
            "customerName": s.get('customerName'),
            "price": s.get('price'),
            "type": s.get('type'),
            "items": s.get('items'),
            "timeOfSale": s.get('timeOfSale'),
            "collectionTime": s.get('collectionTime'),
            "collected": s.get('collected'),
        }
        response["this_month_sales"].append(sale)
        response["total_month_revenue"] += sale['price']

        if sale['type'] not in response["revenue_by_type"]:
            response["revenue_by_type"][sale['type']] = sale['price']
        else:
            response["revenue_by_type"][sale['type']] += sale['price']

        if sale['customerName'] not in response["revenue_by_customerName"]:
            response["revenue_by_customerName"][sale['customerName']] = sale['price']
        else:
            response["revenue_by_customerName"][sale['customerName']] += sale['price']

        if sale['collected'] == False:
            response["uncollected_sales"].append(sale)

    response["this_month_sales"].sort(key = lambda x: time.strptime(x['timeOfSale'], "%Y-%m-%d %H:%M:%S"), reverse=True)
    response["uncollected_sales"].sort(key = lambda x: time.strptime(x['timeOfSale'], "%Y-%m-%d %H:%M:%S"), reverse=True)
    response["revenue_by_type"] = dict(sorted(response["revenue_by_type"].items(), key = lambda x: x[1], reverse=True))
    response["revenue_by_customerName"] = dict(sorted(response["revenue_by_customerName"].items(), key = lambda x: x[1], reverse=True))
    response["average_sale_value"] = response["total_month_revenue"] / response["total_sales"]

    return func.HttpResponse(
            json.dumps(response),
            status_code=200,
            mimetype="application/json")
