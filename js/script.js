{
  'use strict';
    
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
    optArticleAuthorSelector = '.post-author';
    
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

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        
        /* insert link into titleList */

      titleList.insertAdjacentHTML('beforeend',linkHTML);
    }
    
    const links = document.querySelectorAll('.titles a');
        
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();
  
    
    
  function generateTags(){
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
            const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
            console.log(linkHTML);

      /* add generated code to html variable */
            html = html + linkHTML;
          
    /* END LOOP: for each tag */
          }
    /* insert HTML of all the links into the tags wrapper */
        titleList.insertAdjacentHTML('beforeend', html);
  
  /* END LOOP: for every article: */
    }
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
      const links = document.querySelectorAll('.post-tags .list a');
    /* START LOOP: for each link */
        for (let link of links) {
      /* add tagClickHandler as event listener for that link */
            link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
        }
  }
  addClickListenersToTags();
    
    
  function generateAuthors(){
      const authorsList = document.querySelectorAll(optArticleAuthorSelector);
      //console.log(authorsList);
      for (let article of authorsList){
        const articleAuthor = article.getAttribute('data-author');
        //console.log(articleAuthor);
        const linkHTML = '<li><a data-author="' + articleAuthor + '">' + articleAuthor + '</a></li> ';
        console.log(linkHTML);
      }
         
  }
  generateAuthors(); 
    
  
  function authorClickHandler(event){
      event.preventDefault();
      const clickedElement = this;
      
      
  
      generateTitleLinks('[data-author="' + articleAuthor + '"]');
  }
    
  
    
  function addClickListenersToAuthors(){
      const links = document.querySelectorAll('.list .authors a');
      for (let link of links) {
        link.addEventListener('click', authorClickHandler);
      }
  }
  addClickListenersToAuthors();
    
}