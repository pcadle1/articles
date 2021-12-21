// path to your articles.json file
import fs from 'fs'
import _ from 'lodash'
const articlesPath = "articles.json"
class Article {
    constructor({id, title, url, description}){
        this.id = id
        this.title = title
        this.url = url
        this.description = description || null
    }

    static findAll(){
        const articleData = JSON.parse(fs.readFileSync(articlesPath)).articles
        const articles = articleData.map(article => {
            return new Article(article)
        })
        return articles
    }

    static getNextId() {
        const max = _.maxBy(this.findAll(), article => article.id)
        return max.id + 1
    }

    save(){
        this.id = this.constructor.getNextId()
        const articles = this.constructor.findAll()
        articles.push(this)
        fs.writeFileSync(articlesPath, JSON.stringify({articles: articles}))
    }

    static isValid(url){
        let http = url.slice(0, 7)
        let https = url.slice(0, 8)
        return (http === 'http://' || https === 'https://')
    }

    static getTenArticles(pageNumber){
        pageNumber = (pageNumber - 1) * 10
        const articleData = JSON.parse(fs.readFileSync(articlesPath)).articles
        const ten = articleData.splice(pageNumber, 10)
        const tenArticles = ten.map(article => {
            return new Article(article)
        })
        return tenArticles
    }
}

export default Article
