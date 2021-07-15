const express = require('express');

const router = express.Router();
var articlesList = [{ articleURL: 'https://www.sciencedaily.com/releases/2021/07/210708143856.htm', 
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
}

];

router.get('/', (req, res) => {
  res.json(articlesList);

});

module.exports = router;
