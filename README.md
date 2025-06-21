# (Node-Typescript-Express-Mongodb-Mongoose-Library-Management-Backend)

### Technology and language usages description:

    * Node js and Express js and typescript for backend technology.
    * For database I use mongodb and mongoose ORM.
    * I use middleware and instance methods and statics method for data find and exists.
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

_Api Base Url_ (https://library-management-server-s.vercel.app/)

### response

```json
"Library Management Server is Running ..."
```

--

### Book Section Api

---

### 1\. Insert A Book

**POST** `https://library-management-server-s.vercel.app/api/books`

#### Schema Model:

```json
{
  title:string, //title must greater than or equal 3 characters (required)
  author:string, //length must greater than or equal 3 characters (required)
  genre:string, // must be from these (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY) (required)
  isbn: string, //must be an unique value (required)
  description: string,// (optional)
  copies: number, //must be and positive number (required)
  available: boolean //default true (required)
}

```

#### Request:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### Response:

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
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
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
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
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

---

### 4\. Update A Book By Id

**PUT** `https://library-management-server-s.vercel.app/api/books/:bookId`

#### Request:

```json
{
  "copies": 50 //value must positive number
}
```

#### Response:

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
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
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}

```
