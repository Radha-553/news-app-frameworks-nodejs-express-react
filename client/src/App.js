import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';


const useStyles = withStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PinnedArticles = (props) => {
  return (

    <Card className="row" style={{maxWidth: 345}}>
      <CardHeader 
        title=  {props.title}
        subheader= {props.publishedDate}
      />
    
      <CardMedia 
        style={{height: 0,
          paddingTop: '56.25%'}}
        image="src/BrainMechanism.jpg"
        title="Science News"
      />
      <a href = {props.articleURL} >{props.subTitle}</a>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.articleDiscription}
        ...<a href={props.articleURL}> Read more</a>
        </Typography>
      </CardContent>
     
    </Card>
  )
}

const TopArticles = (props) => {
  return (

    <Card className="row" style={{maxWidth: 345}}>
      <CardHeader 
        title=  {props.title}
        subheader= {props.publishedDate}
      />
    
      <CardMedia 
        style={{height: 0,
          paddingTop: '56.25%'}}
        image="src/BrainMechanism.jpg"
        title="Science News"
      />
      <a href = {props.articleURL} >{props.subTitle}</a>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.articleDiscription}
        ...<a href={props.articleURL}> Read more</a>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Checkbox
        
        onChange={props.pinFun}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        aria-label="Pin Article"
        name = {props.subTitle}
      />
      </CardActions>
     
    </Card>
  )
}



export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {displayArticle: "",data : [{ articleURL: 'https://www.sciencedaily.com/releases/2021/07/210708143856.htm', 
    title: "BrainArticle", 
    subTitle: "Article About Brain",
    publishedDate: "The publication date 08/07/2021",
    discription: "When people see a toothbrush, a car, a tree -- any individual object -- their brain automatically associates it with other things it naturally occurs with, allowing humans to build context for their surroundings and set expectations for the world"
    },
    { articleURL: 'https://www.sciencedaily.com/releases/2021/07/210708143856.htm', 
    title: "FlyingBats", 
    subTitle: "Article About FlyingBats",
    publishedDate: "The publication date 08/07/2021",
    discription: "The ability to focus on where we will be in the near future, rather than where we are at present, may be a key characteristic of the mammalian brain's built-in navigation system, suggests a new study."
    },
    { articleURL: 'https://phys.org/news/2021-07-chinese-milestone-qubit.html', 
    title: "Quntam", 
    subTitle: "Article About Quntam",
    publishedDate: "The publication date 12/07/2021",
    discription: "A team of researchers affiliated with multiple institutions in China, working at the University of Science and Technology of China, has achieved another milestone in the development of a usable quantum computer"
    }]};
    
    
    
    this.onChange = this.onChange.bind(this);
    this.searchResult = this.searchResult.bind(this);
    this.pinnedArticles = [];
    this.setArticle = "";
     this.isArticleExists = false;
     this.unpinArticles = [];

    
    this.displayArticle = "";
   
    
    
  }


  componentDidMount() {
    fetch('http://localhost:5000/api/v1/search')
      .then((response) => response.json())
      .then((json) =>  { this.state.data = json; console.log(this.state.data);})
      .catch((error) => console.error(error));
      
  }
 

  onChange(e) {
    this.setArticle = "";
    this.isArticleExists = false;
    this.unpinArticles = [];
    this.setState({ [e.target.name]: e.target.checked });
    console.log(e.target.checked);
    if(e.target.checked){
     
           this.pinnedArticles.push(e.target.name);
         
    }else{
      this.pinnedArticles.map(value => {
        if( e.target.name == value){
            this.isArticleExists = true;
        }
      });
      if(this.isArticleExists){
        this.pinnedArticles.map(value => {
          if( e.target.name != value){
              this.unpinArticles.push(value);
          }
        });
        
        this.pinnedArticles = this.unpinArticles;
      }
    }
    console.log(this.pinnedArticles);
  }
  
  searchResult(e){
    
    this.setState(state => ({
      displayArticle : ""
    })); 
    this.displayArticle = "";
    console.log(this.pinnedArticles);
    console.log(e.target.value);
    this.pinnedArticles.map(value => {
     
      if( e.target.value.toLowerCase() == value.toLowerCase()){
          console.log("search matched");
          this.displayArticle = value;
          this.setState(state => ({
            displayArticle : value
          })); 
      }
    });
    
  }
 

  render() {
    
    return (
      <div  className = "row"> 
    
      <div>Top Articles</div>
    
      <TopArticles title={this.state.data[0].title}   pinFun = {this.onChange}
      publishedDate={this.state.data[0].publishedDate} 
      articleURL={this.state.data[0].articleURL} subTitle={this.state.data[0].subTitle}    
      articleDiscription={this.state.data[0].discription}/>
     <TopArticles title={this.state.data[1].title}   pinFun = {this.onChange}
      publishedDate={this.state.data[1].publishedDate} 
      articleURL={this.state.data[1].articleURL} subTitle={this.state.data[1].subTitle}    
      articleDiscription={this.state.data[1].discription}/>  
      <TopArticles title={this.state.data[2].title}   pinFun = {this.onChange}
      publishedDate={this.state.data[2].publishedDate} 
      articleURL={this.state.data[2].articleURL} subTitle={this.state.data[2].subTitle}    
      articleDiscription={this.state.data[2].discription}/> 

    <div>
    
          <input
            placeholder="Type Pinned Article here..."
            
            onChange={this.searchResult}
          />
        
    </div>

    
    <div>
    { this.state.displayArticle.toLocaleLowerCase() == 'article about brain' ? <PinnedArticles title={this.state.data[0].title} publishedDate={this.state.data[0].publishedDate} 
      articleURL={this.state.data[0].articleURL} subTitle={this.state.data[0].subTitle}    
      articleDiscription={this.state.data[0].discription}/> : 
     this.state.displayArticle.toLocaleLowerCase() == 'article about flyingbats' ? <PinnedArticles title={this.state.data[1].title} publishedDate={this.state.data[1].publishedDate} 
     articleURL={this.state.data[1].articleURL} subTitle={this.state.data[1].subTitle}    
     articleDiscription={this.state.data[1].discription}/> : 
     this.state.displayArticle.toLocaleLowerCase() == 'article about quntam' ? <PinnedArticles title={this.state.data[2].title} publishedDate={this.state.data[2].publishedDate} 
     articleURL={this.state.data[2].articleURL} subTitle={this.state.data[2].subTitle}    
     articleDiscription={this.state.data[2].discription}/> : 'No Pinned Articles'}
    </div>
    </div>
    );
  }
}


