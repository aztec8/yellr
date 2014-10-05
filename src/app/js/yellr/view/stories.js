'use strict';
var yellr = yellr || {};

yellr.view.stories = (function() {

    var render_template = yellr.utils.render_template;
    var header, footer;



    var render = function(data) {

      /**
       * get the hash (single or feed view?)
       */


      header = data.template.header;
      footer = data.template.footer;

      if (data.hash === '#view-news')
        this.read_story(data.id);
      else {
        header.template = '#main-header';
        // subnav
        render_template({
          target: '#app-subnav',
          template: '#homepage-subnav',
          context: {
            assignments: yellr.SCRIPT.assignments,
            news_feed: yellr.SCRIPT.news_feed
          }
        });

        document.querySelector('#news-feed-tab').className = 'current';
        $('#news-feed-tab').on('click', function (e) {
          yellr.utils.load('stories', function () {
            yellr.view.stories.render_feed();
            yellr.utils.notify('Latest stories loaded');
          });
        });


        // add "pull-down" to refresh
        yellr.utils.pulldown_to_refresh({
          target: '#latest-stories',
          container: '#news-feed',
          callback: function () {
            yellr.utils.load('stories', function () {
              yellr.view.stories.render_feed();
              yellr.utils.notify('Latest stories loaded');
            });
          }
        });


        this.render_feed();
      }

      render_template(header);
      render_template(footer);
      yellr.utils.setup_report_bar();

    }





    var render_feed = function() {

      // render the content
      render_template({
        template: '#news-feed-li',
        target: '#latest-stories',
        context: {
          stories: yellr.DATA.stories,
          no_news_in_your_area: yellr.SCRIPT.no_news_in_your_area,
          get_your_voice_heard: yellr.SCRIPT.get_your_voice_heard
        }
      });

    }





    var read_story = function(id) {
      header.template = '#page-header';
      header.context = {
        page: yellr.SCRIPT.news_story,
        hash: '#news-feed'
      };
      yellr.utils.no_subnav();

      var story = {
        template: '#news-story-template',
        target: '#story-container'
      };

      for (var i = 0; i < yellr.DATA.stories.length; i++) {
        if (yellr.DATA.stories[i].id === parseInt(id)) {

          story.context = {
            title: yellr.DATA.stories[i].title,
            contents: yellr.DATA.stories[i].contents
          }

          if (yellr.DATA.stories[i].image) {
            story.context.image = yellr.DATA.stories[i].image;
            story.context.image_caption = yellr.DATA.stories[i].image_caption;
          }

          break;
        }
      }

      render_template(story);

    }





    return {
      read_story: read_story,
      render: render,
      render_feed: render_feed
    }
})();
