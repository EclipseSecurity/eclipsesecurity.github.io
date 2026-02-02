// EclipseSec site scripts
document.addEventListener('DOMContentLoaded', function(){
  console.log('EclipseSec site loaded');

  // Theme toggle
  var themeToggle = document.querySelector('.theme-toggle');
  var savedTheme = localStorage.getItem('eclipsesec-theme');

  // Check for saved theme or system preference
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var currentTheme = document.documentElement.getAttribute('data-theme');
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('eclipsesec-theme', newTheme);
    });
  }

  // Simple client-side search for blog posts (includes featured)
  var search = document.getElementById('post-search');
  if(search){
    var allPosts = Array.from(document.querySelectorAll('.post, .featured-post'));
    var clearBtn = document.getElementById('clear-search');
    function filterPosts(){
      var q = search.value.trim().toLowerCase();
      allPosts.forEach(function(p){
        var text = (p.innerText || '').toLowerCase();
        p.style.display = q === '' || text.indexOf(q) !== -1 ? '' : 'none';
      });
    }
    search.addEventListener('input', filterPosts);
    clearBtn && clearBtn.addEventListener('click', function(){ search.value=''; search.focus(); filterPosts(); });
    // keyboard focus: Ctrl+K to focus search
    window.addEventListener('keydown', function(e){ if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); search.focus(); }});
  }

  // Tag buttons: filter posts by data-tags attribute (includes featured)
  var tagButtons = Array.from(document.querySelectorAll('.tag-btn'));
  if(tagButtons.length){
    var postsAll = Array.from(document.querySelectorAll('.post, .featured-post'));
    function applyTag(tag){
      postsAll.forEach(function(p){
        var tags = (p.getAttribute('data-tags')||'').toLowerCase().split(/\s+/).filter(Boolean);
        if(tag === 'all' || tags.indexOf(tag) !== -1){ p.style.display = ''; }
        else { p.style.display = 'none'; }
      });
      tagButtons.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-tag')===tag); });
    }
    tagButtons.forEach(function(btn){ btn.addEventListener('click', function(){ applyTag(btn.getAttribute('data-tag')); }); });
    // set default active to 'all'
    var hasAll = tagButtons.some(b=>b.getAttribute('data-tag')==='all');
    if(hasAll) applyTag('all');
  }
});
