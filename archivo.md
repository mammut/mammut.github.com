---
layout: page
title: Archivo
permalink: /archivo/
---

<ul class="unstyled">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
