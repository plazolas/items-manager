import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {DebugService} from '../services/debug.service';
import {NewsService} from '../services/news.service';
import {Article} from '../model/article';
import {ArticleList} from '../model/article-list';

@Component({
    selector: 'app-headlines',
    templateUrl: './headlines.component.html',
    styleUrls: ['./headlines.component.css']
})

export class HeadlinesComponent implements OnInit {
    title = 'Headlines at DevenZone';
    headline: Article = {} as Article;
    headlines: Article[] = [];
    country = 'us';

    constructor(private debugService: DebugService,
                private http: HttpClient,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private newsService: NewsService
    ) {

    }

    async ngOnInit() {
        document.title = this.title;
        this.getTopHeadlines('us')
    }

    getTopHeadlines(country: string) {
        this.newsService.getTopHeadlines(country)
            .subscribe({
                next: (data) => {
                    const list = data as ArticleList
                    this.headlines = list.articles;
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
    }

    onClickSubmit() {
    }
}
