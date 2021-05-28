# Crypto Charts

## INDEX

- List Rates
- 24hr Status
- Live Trades
- Icons
- Rates

## List Rates

Lates crypto rates in different currencies.

**URL** - https://x.wazirx.com/wazirx-falcon/api/v2.0/crypto_rates

**METHOD** - GET

**RESPONSE** -

```json
{
  "btc": {
    "btc": "1",
    "eur": "30795.857268000003",
    "idr": "536092738.5",
    "inr": "2941627",
    "ngn": "15491259.336959999",
    "rub": "2761706.213508",
    "sar": "140874.104514",
    "try": "317566.0125",
    "uah": "1034800.1320140001",
    "usdt": "37554",
    "wrx": "25813.11306143521"
  }
  // ...
}
```

## 24hr Status

Last 24hrs market status

**URL** - https://api.wazirx.com/uapi/v1/tickers/24hr

**METHOD** - GET

**RESPONSE** -

```json
[
  {
    "symbol": "eosinr",
    "baseAsset": "eos",
    "quoteAsset": "inr",
    "openPrice": "465.0",
    "lowPrice": "456.92",
    "highPrice": "528.0",
    "lastPrice": "488.74",
    "volume": "71962.13",
    "bidPrice": "487.08",
    "askPrice": "488.74",
    "at": 1622089243000
  }
  // ...
]
```

\- OR -

**URL** - https://api.wazirx.com/uapi/v1/ticker/24hr?market=eosinr

**METHOD** - GET

**RESPONSE** -

```json
{
  "symbol": "eosinr",
  "baseAsset": "eos",
  "quoteAsset": "inr",
  "openPrice": "466.03",
  "lowPrice": "456.92",
  "highPrice": "528.0",
  "lastPrice": "490.0",
  "volume": "71962.13",
  "bidPrice": "488.61",
  "askPrice": "490.0",
  "at": 1622089389000
}
```

## Live Trades

Live trades

**URL** - https://api.wazirx.com/uapi/v1/trades?market=eosinr&limit=2

**METHOD** - GET

**RESPONSE** -

```json
[
  {
    "id": 112777231,
    "price": "488.04",
    "qty": "2.04",
    "quoteQty": "995.6016",
    "time": 1622089834000,
    "isBuyerMaker": true
  },
  {
    "id": 112776931,
    "price": "485.74",
    "qty": "6.06",
    "quoteQty": "2943.5844",
    "time": 1622089809000,
    "isBuyerMaker": false
  }
]
```

## Icons

Purple colored Currencies PNG icons.

**URL** - https://media.wazirx.com/media/eos/84.png

**METHOD** - GET

## Rates

**URL** - https://x.wazirx.com/api/v2/k?market=eosinr&period=1&limit=10&timestamp=1622128167

**METHOD** - GET

```json
[
  [1622127960, 546.0, 546.0, 546.0, 546.0, 2.0],
  [1622128020, 546.74, 546.74, 545.27, 546.0, 102.17],
  [1622128080, 546.0, 549.99, 543.9, 549.99, 408.96],
  [1622128140, 549.99, 549.99, 546.0, 546.0, 191.5],
  [1622128200, 546.13, 546.13, 543.59, 543.59, 1.44],
  [1622128260, 547.75, 548.94, 543.7, 545.0, 309.77],
  // ...
]
```
