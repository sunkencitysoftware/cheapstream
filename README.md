cheapstream
===========

The other night, I wanted to watch The Last Airbender and so I went on a hunt to figure out where the best place to get it was.  I checked iTunes, Xfinity on Demand, and then Netflix where I ended up finding it it for free with streaming.  I thought to myself (and Twitter) why isn't there just a website that lets you enter a movie name and it will tell you the cheapest and best place to stream the movie from?  I couldn't find one, so I decided I was going to spend a few hours making one.  And thus, CheapStream was born - A website that lets you search for a movie and it will tell you where the cheapest place it to watch it.  

I found that iTunes had a search API that was openly available.  So I started there.  Threw together a small site based on Foundation and JQuery.  The javascript is very hacky and basic, so don't bash it too much.  So I got that working with iTunes.  Then I started looking at Netflix and it looked like I was going to have to get an API key and all that.  So that ate up a good half hour to register, and go though all their example.  Then later, I found the Netflix OData API.  I didn't need an API key and it was just as easy to use at the iTunes API!  Yay!  So I hooked it up to the same "framework" I made for the iTunes piece too.  So I quickly (in a few hours of Saturday Morning Hackfest) had something that worked decently well. 

So I kept working and I was searching for an answer to another problem and I ran across http://canistream.it and boom!  It was exactally what I was looking for the other night!  So that puts a damper on my development here.  So while it was fun to make what I had, I don't really need to continue working on it, so I thought I'll just put it on github for others to look at and play with.  

Known issues:
* It only really works with non-ambigious movie titles.  It restricts the "type" in both searchs to movies, but when you search for something like "Annie" you get different results from iTunes and Netflix.  If you search for something like The Hunger Games, it works just fine. 
* I discovered that the iTunes API doesn't tell you how much rentals cost or if it is available in HD.  The Netflix API was much better in this respect. 
* Tumbnails were inconsisent from each service.  And the biggest iTunes tumbnail was 100px on the longest side. 

Obviously there was much more to do like:
* Add other services like Amazon, Xfinity, Hulu, etc
* I wanted to make it work just as well on a TV as it does on your desktop.  

So I turn this over to the world at this point.  I also took the time to learn something else new and awesome: github:Pages!  So you can go to http://sunkencitysoftware.github.com/cheapstream/ and try out CheapStream for yourself!  Enjoy!
