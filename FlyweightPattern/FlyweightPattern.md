# 轻量级模式

> 使用相同对象时重用现有实例

## 简介

当我们创建大量类似的对象时，flyweight模式是一种保存内存的有用方法。

![image-20220221233728767](https://tva1.sinaimg.cn/large/e6c9d24egy1gzlk4lvmbhj21s80jqwgf.jpg)

## 实现

 在我们的应用程序中，我们希望用户能够添加书籍。所有的书都有标题、作者和isbn编号!然而，图书馆通常不会只有一本书的副本:它通常有同一本书的多个副本。

 如果同一本书有多个副本，那么每次都创建一个新的图书实例就不是很有用了。相反，我们希望创建Book构造函数的多个实例，它们表示单个Book。

```jsx
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const books = new Map();
const bookList = [];

const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn
  };

  bookList.push(book);
  return book;
};

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};

console.log(addBook("Sudongyuer", "JK Rowling", "AB123", false, 100))
console.log(addBook("Sudongyuer", "JK Rowling", "AB123", true, 50))
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length);
console.log("Total amount of books: ", books.size);

```

- 使用map来保存已经存在的对象
- 使用list来保存图书的总数量
- 复用了同一isbn的实例对象

## 优点

- 当创建大量对象时，flyweight模式非常有用，因为这些对象可能会耗尽所有可用的RAM。
- 它允许我们将消耗的内存量最小化。  在JavaScript中，我们可以通过原型继承很容易地解决这个问题。
- 如今，硬件拥有gb的RAM，这使得次量级模式变得不那么重要。