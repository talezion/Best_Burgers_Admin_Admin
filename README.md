# Admin Docs

## Login Page

1. Log in auth only
2. show error message

## Dashboard Page

### Design 
_(Feel free to use any design you want, this is just wireframes.)_

#### Auth 

![Login](assets/login.png)

#### Place Validation 

![Place](assets/place.png)

#### Image Validation 

![Login](assets/images.png)

#### Setting Thumb nail 

![Place](assets/thumbnail.png)

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

**EXAMPLE**

```json 
{
	"added_by": "9RUMvMuH8CRfIEwbE3CQXqhQZEi1",
	"burger_name": "Bleecker Victoria",
	"burger_search_name": "bleecker victoria",
	"google_id": "ChIJO46LpyEFdkgR5-0jDOGhiKw",
	"google_url": "https://maps.google.com/?cid=12432364759299648999",
	"is_chain": false,
	"is_validated": false,
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
	"was_reviewed": false
}
```
>NOTE: You only need to set `was_reviewed: true` && `is_validated: true || false`

#### 2. Images Validation
```
GET /images_container/{burger_id}.json
```

##### Approve 

`asynchronous calls`

###### CALL 1
```
PATCH /images_approved/{burger_id}.json
```

```json
{
  "{image_id}" : 1
}
```
###### CALL 2
```
DELETE /images_container/{burger_id}/{image_id}.json"
```

##### Reject

`asynchronous calls`

###### CALL 1
```
PATCH /images_rejected/{burger_id}.json
```

```json
{
  "{image_id}" : 1
}
```

###### CALL 2
```
DELETE /images_container/{burger_id}/{image_id}.json"
```

#### 3. Thumbnail Images

```
GET /images_approved.json
```
**IMPORTANT: Do not load all images at once. Only when user scrolls**

_Example of a burger object with a `highlight_image`_

```json
{
"added_by": "bejDrFK9FsVbhPWLRxPvMHrJEav2",
"burger_name": "BBB",
"burger_search_name": "bbb",
"google_id": "ChIJN2fwpoJLHRURxb3duY9M3sQ",
"google_url": "https://maps.google.com/?cid=14185860056445992389",
"highlight_image": {
	"added_by": "bejDrFK9FsVbhPWLRxPvMHrJEav2",
	"created_at": "2019-03-26T15:51:55.726Z",
	"google_photo_reference": "CmRaAAAAHYkunPU-469ivVU1iuRue3B6UEmF0LFHlmeAriVR9-aZk-aeWkpObgjzPwjP--p2e-8JdF3QhDOQDi67T34RnCQJ6oPEeBLxC5HoWy2K2oAmQ1FjxVvTzM08sKYHUoP_EhCdtxqyIgIE44kVqKx0N8A0GhT8SCvOB8gSbg9A2tofXJiqVI4XfQ",
	"height": 1080,
	"html_attributions": [
		"<a href=\"https://maps.google.com/maps/contrib/100918061067320897819/photos\">yaron brener</a>"
	],
	"is_validated": false,
	"name": "",
	"owner_id": "-LaugqGgTDBTk1x3GZU-",
	"url": "https://firebasestorage.googleapis.com/v0/b/burgers-best-stage.appspot.com/o/burger_images%2FFCDF45CF-A819-4644-98DB-567099A466D7.jpg?alt=media&token=90e316f9-fb64-4824-93e7-bb4aff82a9a9",
	"width": 1620
},
"is_chain": false,
"is_validated": true,
"likes_count": 6,
"location": {
	"address": "HaArba'a St 12, Tel Aviv-Yafo, Israel",
	"coordinates": {
		"lat": 32.0702821,
		"long": 34.78407709999999
	},
	"geohash": "sv8wrw0yztz"
},
"price_range": 2,
"was_reviewed": true
}
```

```
PATCH /burgers/{burger_id}.json
```

```
{
	... burger object
	"highlight_image" : # Set the image object in the current burger object.
}
```

### Credentials

#### Login creds
```
Admin username: admin-dev@bestburgers.app
Viewers username: non-admin-dev@bestburgers.app
password: cd'@]P9Hb6buQ*!J
```

#### API Creds

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
