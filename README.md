# Admin Docs

## Login Page

1. Log in auth only
2. show error message

## Dashboard Page

### Design

![Login](assets/login.jpg)

![Place](assets/place.jpg)

![Login](assets/images.jpg)

![Place](assets/thumbnail.jpg)

### API

#### 1. Burger Validation

```
GET /burgers.json

Parameters

{
 "orderBy": "\"was_reviewed\"",
 "equalTo": "false"
{
```

```
PATCH /burgers/{burger_id}.json
```

```json 
{
	"added_by": "9RUMvMuH8CRfIEwbE3CQXqhQZEi1",
	"burger_name": "Bleecker Victoria",
	"burger_search_name": "bleecker victoria",
	"google_id": "ChIJO46LpyEFdkgR5-0jDOGhiKw",
	"google_url": "https://maps.google.com/?cid=12432364759299648999",
	"is_chain": false,
	"is_validated": false, # Approve: true, Reject: false
	"likes_count": 0,
	"location": {
		"address": "205 Victoria St, Westminster, London SW1E 5NE, UK",
		"coordinates": {
			"lat": 51.4965056,
			"long": -0.1446547
		},
		"geohash": "gcpuuwwsvk3"
	},
	"price_range": 0,
	"was_reviewed": false # Set to true
}
```

#### 2. Images Validation
```
GET /images_container/{burger_id}.json
```

#### 3. Thumbnail Images

```
GET /images_approved.json
```

### Credentials

```
var firebaseConfig = {
          apiKey: "AIzaSyA_n8zAZIEIxbegQpaDRcPuM3BaXm1Apr4",
          authDomain: "burgers-best-stage.firebaseapp.com",
          databaseURL: "https://burgers-best-stage.firebaseio.com",
          projectId: "burgers-best-stage",
          storageBucket: "burgers-best-stage.appspot.com",
          messagingSenderId: "1089706900218",
          appId: "1:1089706900218:web:eeda4bc080b7ea5f"
      };
      firebase.initializeApp(firebaseConfig);
```