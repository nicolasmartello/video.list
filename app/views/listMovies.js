define([
	'jquery',
	'underscore',
	'backbone',
	'models/movie',
	'text!../templates/listsMovies.html',
	'text!../templates/footerPagination.html'
	], function($,_, Backbone, Movie,Template, PageTemplate){
		
		var pagesCount = 3, currentPage;  
		
		var MovieListView = Backbone.View.extend({
			
			render:function(page){

				if( page === undefined)
					currentPage = 1;
				else
					currentPage = page;

	            this.TableMovie();
				
				this.PageFooter();

	            return this;
            },

            TableMovie: function (){
            	
            	var compiledTemplate = _.template( Template );                                

				var items = this.collectionMovies.pagination(pagesCount,currentPage);
				console.log('collectionMovies: ',this.collectionMovies.toJSON());
				this.$el.html(compiledTemplate({
	                
	                movies: this.collectionMovies.toJSON()

	            }));

            },

            PageFooter: function (){
            	
            	var fTemp = _.template( PageTemplate ); 

            	var pages = Math.ceil( this.collectionMovies.length / pagesCount );

            	var arr = [];

                for( var i = 1 ; i <= pages ; i++ )
                {
                    
                    if(i == currentPage )
                        selectPage = "select";
                    else
                    	selectPage = "normal";
                    
                    arr.push({ pageNumber: i, class_page:selectPage });
                }
                
                
            	this.$el.find('tfoot td').html(
            	
            	 	fTemp({ listPages: arr })
            	
            	);

            }

	});

	return MovieListView;

});