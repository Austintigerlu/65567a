import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, {useMemo, useState} from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [pageSize, setPageSize] = useState(15)
  const [currentPage, setCurrentPage] = useState(1);
  const currentPaginationData = useMemo(()=> {
    const firstIndex = (currentPage - 1) * pageSize;
    const lastIndex = firstIndex + pageSize;
    return blogs.posts.slice(firstIndex, lastIndex)
  }, [currentPage, pageSize]);

  const updateRowsPerPage = (e) => {setPageSize(e)};


  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={e => setCurrentPage(e)}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
