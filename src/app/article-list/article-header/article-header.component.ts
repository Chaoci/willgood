import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from '../article';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [NgIf,DatePipe , FormsModule],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnInit{
  @Input() article!: Article;
  @Output() delete = new EventEmitter<any>();
  @Output() changeTitle = new EventEmitter<Article>();

  isEdit = false;
  originalTitle: string = '';

  ngOnInit(): void {
    this.originalTitle = this.article.title;
  }

  undoTitle(){
    this.isEdit = false;
    this.originalTitle = this.article.title;
  }

  onCancelClick(){
    this.isEdit = false;
  }

  onDeleteClick(){
    this.delete.emit(this.article);
  }

  onChangeTitle(title:string){
    this.originalTitle = title;
    const updatedArticle = Object.assign({}, this.article, { id:this.article.id, title: this.originalTitle });
    this.changeTitle.emit(updatedArticle);
  }

  onEditClick(){
    this.isEdit = true;
  }
}
