{
  'use strict';
    
  const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorList: Handlebars.compile(document.querySelector('#template-author-list').innerHTML)
  };
    
/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  

  /* [DONE] remove class 'active' from all article links  */
    
    const activeLinks = document.querySelectorAll('.titles a.active');
      
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

  /* [DONE] add class 'active' to the clicked link */
    
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
    
    const activeArticles = document.querySelectorAll('.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

  /* [DONE] get 'href' attribute from the clicked link */
    
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    
  /* [DONE] add class 'active' to the correct article */
    
    targetArticle.classList.add('active');
  };



  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list.authors';
    
  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
    
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    
    for(let article of articles) {    
        
        /* get the article id */

      const articleId = article.getAttribute('id');
        
        /* find the title element */

        /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        
        /* create HTML of the link */

        // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
        
        /* insert link into titleList */

      titleList.insertAdjacentHTML('beforeend',linkHTML);
    }
    
    const links = document.querySelectorAll('.titles a');
        
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();
  
    
  function calculateTagsParams(tags){
    
    const params = {
      max: 0,
      min: 999999
    };
      
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }  
    return params;
  }  
  
    
  function calculateTagClass(count,params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  }
    
  function generateTags(){
    
    let allTags = {};
           
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

  
      
  /* START LOOP: for every article: */
    for(let article of articles) {

    /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
      let html = '';

    /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

    /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
        

    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

      /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        const linkHTMLData = {tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);       

        console.log(linkHTML);

      /* add generated code to html variable */
        html = html + linkHTML;
          
      /* [NEW] check if this link is NOT already in allTags */
          
        if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        } 
    /* END LOOP: for each tag */
      }
        
    /* insert HTML of all the links into the tags wrapper */
      
        titleList.insertAdjacentHTML('beforeend', html); // lista pod artykułem
        
        
    }
    
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    
    /* [NEW] create variable for all links HTML code */
    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' </a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);
    
    /* [NEW] generate code of a link and add it to allTagsHTML */
      
        //allTagsHTML += tagLinkHTML;

        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
        
      //allTagsHTML += '<li><a class="tagLinkHTML" href="#">' + tag + ' ('+ allTags[tag] +')</a></li>';
    }
    /* [NEW] END LOOP: for each tag in allTags: */
      
    

    /*[NEW] add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;  // chmura z tagami
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  }

  generateTags();
   
    
  function tagClickHandler(event){
  /* prevent default action for this event */
    event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(tagLinks);
  /* START LOOP: for each active tag link */
    for(let tagLink of tagLinks){
    /* remove class active */
      tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
    const tagHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for(let tagHrefLink of tagHrefLinks){
    /* add class active */
      tagHrefLink.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    console.log(links);
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();
    
  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      const articleAuthor = article.getAttribute('data-author');
      //const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      
      const linkHTMLData = {author: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
          
      if(!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      } 
        
      authorWrapper.insertAdjacentHTML('beforeend', linkHTML); //autor przed artykułem
        
      
    }
    
    const authorList = document.querySelector(optAuthorsListSelector);
    const authorParams = calculateTagsParams(allAuthors);

    //let allAuthorsHTML = '';
    const allAuthorsData = {authors: []};

    for(let author in allAuthors){
      //const linkHTML = '<li><a href="#author-' + author + '">' + author + ' </a></li>';
 
      //allAuthorsHTML += linkHTML;
    
      allAuthorsData.authors.push({
          author: author,
          count: allAuthors[author],
        });
      }
      
      

    authorList.innerHTML = templates.authorList(allAuthorsData); // autorzy z prawej pod tagami
  }

  generateAuthors(); 
  
  function authorClickHandler(event){
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
      
    for(let authorLink of activeAuthorLinks){
      authorLink.classList.remove('active');
    }

    const authorHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
      
    for(let authorHrefLink of authorHrefLinks){
      authorHrefLink.classList.add('active');
    }
      
    generateTitleLinks('[data-author="' + author + '"]');
  }
    
  function addClickListenersToAuthors(){
    const links = document.querySelectorAll('a[href^="#author-"]');
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();
}