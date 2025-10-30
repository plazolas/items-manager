import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import {DebugService} from '../services/debug.service';
import {NewsService} from '../services/news.service';
import {Article} from '../model/article';
import {ArticleList} from '../model/article-list';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
    title = 'News at DevenZone';
    article: Article = {} as Article;
    articles: Article[] = [];
    topic: FormControl;
    articleForm: FormGroup;

//////////////////////////////////////////////////////////////////////////    construct   ////////////////////////////
    constructor(private debugService: DebugService,
                private http: HttpClient,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private newsService: NewsService
    ) {
        this.topic = new FormControl('');
        this.articleForm = new FormGroup({
            topic: this.topic,
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////  onInit  ///////////////////

    async ngOnInit() {
        document.title = this.title;
        this.getEverything('Thomas Massie');
    }

    getEverything(topic: string) {
        this.newsService.getEverything(topic)
            .subscribe({
                next: (data) => {
                    const list = data as ArticleList
                    this.articles = list.articles;
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
    }

    onClickSubmit() {
        if(this.topic.value && this.topic.value.length > 0) {
            this.article = {} as Article
            this.articles = []
            this.getEverything(this.topic.value);
        }
    }
}
