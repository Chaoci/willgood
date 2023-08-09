import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from '../article';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnInit{
  @Input() article!: Article;
  @Output() delete = new EventEmitter<any>();
  @Output() changeTitle = new EventEmitter<Article>();

  isEdit = false;
  newTitle: string = '';

  ngOnInit(): void {
    this.newTitle = this.article.title;
  }


  onCancelEdit(){
    this.isEdit = false;
  }

  deleteArticle(){
    this.delete.emit(this.article);
  }

  onEditArticle(title:string){
    this.newTitle = title;
    const updatedArticle = Object.assign({}, this.article, { id:this.article.id, title: this.newTitle });
    this.changeTitle.emit(updatedArticle);
  }

  onEditState(){
    this.isEdit = true;
  }
}
