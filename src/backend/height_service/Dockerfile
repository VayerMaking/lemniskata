FROM python:3.10.2

WORKDIR /api

ADD . /api

RUN pip install -r requirements.txt

EXPOSE 6972

# ENTRYPOINT ["tail", "-f", "/dev/null"]