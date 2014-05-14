all:
	protoc --descriptor_set_out=ip_event.desc --include_imports ip_event.proto
