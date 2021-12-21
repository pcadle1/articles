import express from "express"
import Article from "../models/Article.js"

const articlesRouter = new express.Router()

articlesRouter.get('/', (req, res) => {
    res.render('articles/index', {articles: Article.getTenArticles(1), page: 1})
})

articlesRouter.get('/page/:pageNumber', (req, res) => {
    let page = parseInt(req.params.pageNumber) + 1
    if(Article.getTenArticles(page).length > 0){
        res.render('articles/index', {articles: Article.getTenArticles(page), page: page})
    }
})

articlesRouter.get('/new', (req, res) => {
    res.render('articles/newArticle')
})

articlesRouter.post('/new', (req, res) => {
    const {title, url, description} = req.body
    if(title && url && Article.isValid(url) && description.length >= 20){
        const newArticle = new Article({title, url, description})
        newArticle.save()
        res.redirect('/articles')
    }else if (!Article.isValid(url)){
        res.render('articles/newArticle', {error: 'Enter a valid URL', info: req.body})
    }else if (description.length < 20){
        res.render('articles/newArticle', {error: 'Enter a description greater than 20 characters', info: req.body})        
    }
    else{
        res.render('articles/newArticle', {error: 'Please enter all fields!', info: req.body})
    }
})

export default articlesRouter