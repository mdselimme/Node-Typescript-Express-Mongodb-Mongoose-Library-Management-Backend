# (Node-Typescript-Express-Mongodb-Mongoose-Library-Management-Backend)

### Technology and language usages description:

    * Node js and Express js and typescript for backend technology.
    * For database I use mongodb and mongoose ORM.
    * Use instance methods and statics method for data find and exists.
    * Use pre and post middleware when borrow data deletion.
    * For backend hosting I use vercel.

- It's a library management backend server. Where you can borrow books. Core Features:

  1. User can create a book.
  2. User can find all books.
  3. User can get a book by id.
  4. User can update book copies by id if it is not available.
  5. User can delete a book by id.
  6. User can borrow a book by id.
  7. User can find all books summery.

## Api Documentation

Api Base Url: (https://library-management-server-s.vercel.app/)

### response

```json
{
  "running": "Library Management Server is Running ...",
  "version": 0.1
}
```

--

### Book Section Api

---

### 1\. Insert A Book

**POST** `https://library-management-server-s.vercel.app/api/books`

#### Schema Model:

- title must greater than or equal 3 characters (required)
- author length must greater than or equal 3 characters (required)
- genre must be from these (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY) (required)
- isbn must be an unique value (required)
- description is optional (optional)
- copies must be and positive number (required)
- available default true (required)

```json
{
  "title":"string",
  "author":"string",
  "genre":"string",
  "isbn": "string",
  "description": "string",
  "copies": "number",
  "available": "boolean"
}

```

#### Request:

```json
  {
    "title": "Practical Next.js",
    "author": "Fahim Rahman",
    "genre": "NON_FICTION",
    "isbn": "9781803244501",
    "description": "Build performant web apps with Next.js.",
    "copies": 29,
    "available": true
  }
```

#### Response:

```json
{
    "success": true,
    "message": "Book created successfully",
    "data": {
        "title": "Practical Next.js",
        "author": "Fahim Rahman",
        "genre": "NON_FICTION",
        "isbn": "9781803244501",
        "description": "Build performant web apps with Next.js.",
        "copies": 29,
        "available": true,
        "_id": "685802edc92b4ed7b9e888be",
        "createdAt": "2025-06-22T13:19:41.271Z",
        "updatedAt": "2025-06-22T13:19:41.271Z"
    }
}
```

---

### 2\. Get All Books

**GET** `https://library-management-server-s.vercel.app/api/books`

Support sort and filter method:

Example Query: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`;

change limits: default limit 10;
change filter: other genre value;
change sort : asc or desc (default desc method);

#### Response:

```json
{
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
        {
            "_id": "685802edc92b4ed7b9e888be",
            "title": "Practical Next.js",
            "author": "Fahim Rahman",
            "genre": "NON_FICTION",
            "isbn": "9781803244501",
            "description": "Build performant web apps with Next.js.",
            "copies": 29,
            "available": true,
            "createdAt": "2025-06-22T13:19:41.271Z",
            "updatedAt": "2025-06-22T13:19:41.271Z"
        },
        {...},
    ]
}
```

---

### 3\. Get A Book by ID

**GET** `https://library-management-server-s.vercel.app/api/books/:bookId`

#### Response:

```json
{
    "success": true,
    "message": "Books retrieved successfully",
    "data": {
        "_id": "685802edc92b4ed7b9e888be",
        "title": "Practical Next.js",
        "author": "Fahim Rahman",
        "genre": "NON_FICTION",
        "isbn": "9781803244501",
        "description": "Build performant web apps with Next.js.",
        "copies": 29,
        "available": true,
        "createdAt": "2025-06-22T13:19:41.271Z",
        "updatedAt": "2025-06-22T13:19:41.271Z"
    }
}
```

---

### 4\. Update A Book By Id

**PUT** `https://library-management-server-s.vercel.app/api/books/:bookId`

#### Schema model:

```json
{
  "copies": "number" //value must positive number
}
```

#### Request:

```json
{
  "copies": 50
}
```

#### Response:

```json
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "685802edc92b4ed7b9e888be",
        "title": "Practical Next.js",
        "author": "Fahim Rahman",
        "genre": "NON_FICTION",
        "isbn": "9781803244501",
        "description": "Build performant web apps with Next.js.",
        "copies": 69,
        "available": true,
        "createdAt": "2025-06-22T13:19:41.271Z",
        "updatedAt": "2025-06-22T13:22:37.837Z"
    }
}
```

---

### 5\. Delete A Book By Id

**DELETE** `https://library-management-server-s.vercel.app/api/books/:bookId`

#### Response:

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### Borrow Section Api

---

### 6\. Borrow a Book

**POST** `https://library-management-server-s.vercel.app/api/borrow`

#### Schema Model:

- book ObjectId (required)
- quantity must be greater than 0 (required)
- Date iso string (required)

```json
{
  "book": ObjectId,
  "quantity":"number",
  "dueDate":"string",
}
```

#### Request:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Response:

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

---

### 7\. Get Borrowed Books Summary

**GET** `https://library-management-server-s.vercel.app/api/borrow`

**Response:**

```json
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 55,
            "book": {
                "title": "JavaScript ES6 and Beyond",
                "isbn": "9780134598628"
            }
        },
        {
            "totalQuantity": 100,
            "book": {
                "title": "Clean Architecture with React",
                "isbn": "9780134494166"
            }
        },
    ]
};

```

### 8\. Delete A Borrow Book By Id

**DELETE** `https://library-management-server-s.vercel.app/api/borrow/:bookId`

#### Response:

```json
{
  "success": true,
  "message":  "Borrow book deleted successfully",
  "data": null
}
```

---

## Error Response

---

### Demo Error Response

- If you cannot give genre value any of these types (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY). you will find an error like this.

```json
{
    "message": "Validation failed",
    "success": false,
    "error": {
        "name": "ValidationError",
        "message": "Books validation failed: genre: NON_FICTIOSN is not supported. Please give from these (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)",
        "errors": {
            "genre": {
                "name": "ValidatorError",
                "message": "NON_FICTIOSN is not supported. Please give from these (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)",
                "properties": {
                    "message": "NON_FICTIOSN is not supported. Please give from these (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)",
                    "type": "enum",
                    "enumValues": [
                        "FICTION",
                        "NON_FICTION",
                        "SCIENCE",
                        "HISTORY",
                        "BIOGRAPHY",
                        "FANTASY"
                    ],
                    "path": "genre",
                    "value": "NON_FICTIOSN"
                },
                "kind": "enum",
                "path": "genre",
                "value": "NON_FICTIOSN"
            }
        }
    }
}
```
