Handlebars.registerHelper("cuisine_picture", function (img) {
  if ((cuisine = "Asian")) {
    return <img src="/images/asian_2.jpg" />;
  } else if ((cuisine = "American")) {
    return <img src="/images/american_1.jpg" />;
  } else if ((cuisine = "Indian")) {
    return <img src="/images/indian_3.jpg" />;
  } else if ((cuisine = "Mexican")) {
    return <img src="/images/mexican_2.jpg" />;
  } else if ((cuisine = "Italian")) {
    return <img src="/images/italian_2.jpg" />;
  } else if ((cuisine = "Other")) {
    return <img src="/images/other_1.jpg" />;
  }
});
