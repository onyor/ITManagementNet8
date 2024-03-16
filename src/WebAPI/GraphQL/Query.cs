using System.Collections.Generic;

namespace ITX.WebAPI.GraphQL
{
    public class Book
    {
        public string Title { get; set; }

        public Author Author { get; set; }
        public Book(string title, Author author)
        {
            Title = title;
            Author = author;
        }
    }

    public class Author
    {
        public string Name { get; set; }

        public Author(string name)
        {
            Name = name;
        }
    }

    public class Query
    {
        public string Hello(string name = "World") => $"Hello, {name}!";
        public IEnumerable<Book> GetBook()
        {
            var author = new Author("Name");
            yield return new Book("C# in Depth", author);
            yield return new Book("C# in Depth 2nd Edition", author);
        }

        //[UseProjection]
        //[UseFiltering]
        //[UseSorting]
        //public IQueryable<Student> GetStudents([Service] ITManagementDbContext context) => context.Students;
    }
}
