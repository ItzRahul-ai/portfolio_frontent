import { useEffect } from "react";

const upsertMetaTag = (selector, attribute, value, content) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const Seo = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      upsertMetaTag('meta[name="description"]', "name", "description", description);
      upsertMetaTag('meta[property="og:description"]', "property", "og:description", description);
      upsertMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    if (title) {
      upsertMetaTag('meta[property="og:title"]', "property", "og:title", title);
      upsertMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    }
  }, [title, description]);

  return null;
};

export default Seo;


