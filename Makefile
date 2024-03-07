up:
	docker-compose up
upd:
	docker-compose up -d
down:
	docker-compose down
logs:
	docker-compose logs app
test:
	docker-compose run app npm run test
m\:run:
	docker-compose run app npm run typeorm migration:run
m\:clean-database:
	docker-compose run app npm run clean-database