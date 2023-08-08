import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnInit{
  @Input() article: any;
  @Output() delete = new EventEmitter<any>();
  @Output() changeTitle = new EventEmitter<any>();

  isEdit = false;
  newTitle: string = '';
  ngOnInit(): void {
    this.newTitle = this.article.title;
  }

  deleteArticle(){
    this.delete.emit(this.article);
  }

  doEditArticle(title:any){
    this.newTitle = title;
    this.changeTitle.emit({ id:this.article.id, title:title });
  }

  editArticle(){
    this.isEdit = true;
  }
}
