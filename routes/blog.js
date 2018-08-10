var express = require('express');
var router = express.Router();
var fs = require('fs');

// get the seed data
var data = require('../mydata.json');

function getBlog(alias){
    if(alias){
        var index = parseInt(data.blogIndex[alias]);
        return data.myBlog[index];
    }else{
        return data.myBlog;
    }
}

router.get('/', function (req, res, next) {
    var random = Math.floor(Math.random() * data.myBlog.length);
    res.render('blog', { 
        title: 'Blog', 
        navBlog: true, 
        showFooter: true, 
        extraCss: ['/css/blog.css'],
        categories: data.blogCategories,
        featuredBlog: getBlog()[random] ,
        blog: getBlog() 
    });
});
  
router.get('/:blogAlias', function (req, res, next) {
    var blog = getBlog(req.params.blogAlias);
    res.render('blog-detail', { 
      title: blog.name ,
      navBlog: true, 
      showFooter: true, 
      extraCss: ['/css/blog.css'],
      blog:  blog,
      categories: data.blogCategories
    });
});

module.exports = router;