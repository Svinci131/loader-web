FROM python:3.4-alpine
RUN apk add --update python py-pip
ADD ./web /app/web
WORKDIR /app/web
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
EXPOSE 9000
CMD ["app.py"]
