from flask import Flask, request
from flask import Flask
from flask_cors import CORS
import time
import jwt

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    request_data = request.get_json()
    email = request_data.get('email')
    
    secret_key = "ASCOIUHR3SDVJ2SXF"  # Replace with your own secret key
    payload = {'email': email}
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    
    return {
        "status": "success",
        "token": token
    }

@app.route('/api/customers')
def customers():
    # time.sleep(2)
    return {
        "status": "success",
        "data": [
            {
                "email": "andremayto@gmail.com",
                "customer_id": "cus_123456",
            },
            {
                "email": "ianmayto@gmail.com",
                "customer_id": "cus_123457",
            },
            {
                "email": "jorgecuevas@gmail.com",
                "customer_id": "cus_123457",
            },
        ]
    }

@app.route('/api/payments')
def payments():
    return {
        "status": "success",
        "data": {
            "succeeded": 100.20,
            "uncaptured": 1.22,
            "refunded": 30.20,
            "failed": 10.90
        }
    }

@app.route('/api/balances')
def balance():
    return {
        "status": "success",
        "data": {
            "balance": 100.20,
            "debits": 1.22
        }
    }

@app.route('/api/revenue')
def revenue_per_time():
    # time.sleep(1)

    period = request.args.get('period')
    graphHeader = request.args.get('graphHeader')
    if period == 'Today':
        return {
            "status": "success",
            "data": {
                "times": ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '11:59 PM'],
                "revenue": [0, 37.28, 0, 0, 10, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20]
            }
        }
    elif period == 'Last 7 days':
        return {
            "status": "success",
            "data": {
                "times": ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '11:59 PM'],
                "revenue": [200, 37.28, 0, 0, 10, 0, 10, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        }
    
    return {
            "status": "success",
            "data": {
                "times": ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '11:59 PM'],
                "revenue": [50, 37.28, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0]
            }
        }

@app.route('/api/transactions')
def transactions():
    return {
        "status": "success",
        "data": {
            "count": {
                "all": 140,
                "succeeded": 100,
                "refunded": 10,
                "uncaptured": 20,
                "failed": 10,
            },
            "transactions": [
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Succeeded',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Succeeded',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Succeeded',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Succeeded',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Succeeded',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Refunded',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Refunded',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Refunded',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
            {
                "id": "pi_1J3J9v2eZvKYlo2C5J9J9v2e",
                "amount": 100,
                "status": 'Failed',
                "paymentMethod": 'Visa',
                "description": 'pi_1J3J9v2eZvKYlo2C5J9J9v2e',
                "customer": 'andremayto@gmail.com',
                "date": 'May 22, 10:19 AM'
            },
        ]
        }
    }

@app.route('/api/transactions/<transaction_id>')
def transaction(transaction_id):
    return {
        "status": "success",
        "data": {
            "id": transaction_id,
            "last_update": 'May 22, 10:19 AM',
            "customer": {"email": "andremayto@gmail.com", "customer_id": "cus_123456"},
            "risk_evaluation": "Normal",
            "payment_details": {
                "statement_descriptor": "MATCHE",
                "amount": "100.20",
                "fee": "£2.20",
                "net": "£98.00",
                "status": 'Succeeded',
                "description": ""
            },
            "payment_method": {
                "id": "pm_1J3J9v2eZvKYlo2C5J9J9v2e",
                "number": "4242",
                "fingerprint": "ep_finger_print",
                "expires": "12/2022",
                "type": "Visa debit card",
                "payment_method": "Visa",
                "issuer": "Revolut",
                "owner": "Andre Maytorena",
                "address": "23a Grove End Road, Flat 4, London, NW8 9LL",
                "origin": "United Kingdom",
                "street_check": "passed",
                "zip_check": "passed",
            }
        }
    }

@app.route('/api/customers/list')
def customers_list():
    return {
        "status": "success",
        "data": {
            "count": {
                "all": 140,
                "succeeded": 100,
                "refunded": 10,
                "uncaptured": 20,
                "failed": 10,
            },
            "customers": [
                {
                    "name": "Andre Maytorena",
                    "email": "andremayto@gmail.com",
                    "default_payment_method": "",
                    "total_spend": "£38.40 GBP",
                    "payments": "3",
                    "refunds": "£0.0 GBP",
                    "dispute_losses": "£0.0 GBP"
                },
                {
                    "name": "Andre Maytorena",
                    "email": "andremayto@gmail.com",
                    "default_payment_method": "",
                    "total_spend": "£38.40 GBP",
                    "payments": "3",
                    "refunds": "£0.0 GBP",
                    "dispute_losses": "£0.0 GBP"
                },
                {
                    "name": "Andre Maytorena",
                    "email": "andremayto@gmail.com",
                    "default_payment_method": "",
                    "total_spend": "£38.40 GBP",
                    "payments": "3",
                    "refunds": "£0.0 GBP",
                    "dispute_losses": "£0.0 GBP"
                },
                {
                    "name": "Andre Maytorena",
                    "email": "andremayto@gmail.com",
                    "default_payment_method": "",
                    "total_spend": "£38.40 GBP",
                    "payments": "3",
                    "refunds": "£0.0 GBP",
                    "dispute_losses": "£0.0 GBP"
                },
                {
                    "name": "Andre Maytorena",
                    "email": "andremayto@gmail.com",
                    "default_payment_method": "",
                    "total_spend": "£38.40 GBP",
                    "payments": "3",
                    "refunds": "£0.0 GBP",
                    "dispute_losses": "£0.0 GBP"
                },
            ]
        }
    }

@app.route('/api/products')
def products():
    return {
        "status": "success",
        "data": {
            "count": {
                "all": 140,
                "active": 100,
                "archived": 10,
            },
            "products": [
                {
                    "id": "pd_123456",
                    "name": "Product 1",
                    "pricing": "6 prices",
                    "tax_category": "Download software - personal use",
                    "created": "Feb 28",
                    "updated": "Mar 6",
                    "status": "Active"
                },
                {
                    "id": "pd_123456",
                    "name": "Product 1",
                    "pricing": "6 prices",
                    "tax_category": "Download software - personal use",
                    "created": "Feb 28",
                    "updated": "Mar 6",
                    "status": "Active"
                },
                {
                    "id": "pd_123456",
                    "name": "Product 1",
                    "pricing": "6 prices",
                    "tax_category": "Download software - personal use",
                    "created": "Feb 28",
                    "updated": "Mar 6",
                    "status": "Active"
                }
            ]
        }
    }

if __name__ == '__main__':
    app.run(port=8000, debug=True)
